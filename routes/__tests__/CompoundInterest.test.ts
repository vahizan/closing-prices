import nock from "nock";

const request = require("supertest");
import assert from "assert";
import app from "../../server";

const sinon = require("sinon");

describe("Compound Interest Routes", () => {
  let stub: any;
  let date: Date;
  beforeEach(() => {
    date = new Date(2021, 1, 1, 1, 1, 1, 0);
    stub = sinon.stub(Date, "now");
    stub.returns(date);
  });

  afterEach(() => stub.restore());

  describe("GET /interest/years", () => {
    beforeEach(() => {
      nock("/")
        .get("/interest/years")
        .query({
          initialDeposit: 1000,
          monthlyDeposit: 250,
          yearlyInterest: 1,
          numberOfYears: 5,
        })
        .reply(200, { data: [50, 60, 70, 80] });
    });

    it("When correct params Then should return OK status", (done) => {
      request(app)
        .get("/interest/years")
        .query({
          initialDeposit: 1000,
          monthlyDeposit: 250,
          yearlyInterest: 1,
          numberOfYears: 5,
        })
        .then((res: any) => {
          assert.strictEqual(res.status, 200);
          done();
        })
        .catch((err: Error) => {
          throw err;
        });
    });

    it("When correct params Then should return correct data", (done) => {
      request(app)
        .get("/interest/years")
        .query({
          initialDeposit: 1000,
          monthlyDeposit: 250,
          yearlyInterest: 1,
          numberOfYears: 5,
        })
        .then((res: any) => {
          const expectedData = {
            data: [
              {
                value: 6566,
                year: "2022",
              },
              {
                value: 9647,
                year: "2023",
              },
              {
                value: 12757,
                year: "2024",
              },
              {
                value: 15899,
                year: "2025",
              },
              {
                value: 19073,
                year: "2026",
              },
            ],
          };
          assert.deepStrictEqual(res.body, expectedData);
          done();
        })
        .catch((err: Error) => {
          throw err;
        });
    });

    it("When incorrect query params passed through Then should return UnprocessableEntity(422) status", (done) => {
      request(app)
        .get("/interest/years")
        .then((res: any) => {
          assert.strictEqual(res.status, 422);
          done();
        })
        .catch((err: Error) => {
          throw err;
        });
    });
  });

  describe("GET /interest/total", () => {
    beforeEach(() => {
      nock("/")
        .get("/interest/total")
        .query({
          initialDeposit: 1000,
          monthlyDeposit: 250,
          yearlyInterest: 1,
          numberOfYears: 5,
        })
        .reply(200, { data: 100 });
    });

    it("should return OK status", (done) => {
      request(app)
        .get("/interest/total")
        .query({
          initialDeposit: 1000,
          monthlyDeposit: 250,
          yearlyInterest: 1,
          numberOfYears: 5,
        })
        .then((res: any) => {
          assert.strictEqual(res.status, 200);
          done();
        })
        .catch(done);
    });

    it("When correct params Then should return correct data", (done) => {
      request(app)
        .get("/interest/total")
        .query({
          initialDeposit: 1000,
          monthlyDeposit: 250,
          yearlyInterest: 1,
          numberOfYears: 5,
        })
        .then((res: any) => {
          const expectedData = {
            data: 2256,
          };
          assert.deepStrictEqual(res.body, expectedData);
          done();
        })
        .catch((err: Error) => {
          throw err;
        });
    });

    it("When incorrect query params passed through Then should return UnprocessableEntity(422) status", (done) => {
      request(app)
        .get("/interest/total")
        .then((res: any) => {
          assert.strictEqual(res.status, 422);
          done();
        })
        .catch((err: Error) => {
          throw err;
        });
    });
  });
});
