import nock from "nock";

const request = require("supertest");
import assert from "assert";
import app from "../../server";
import {
  monthlyCompoundTestData,
  yearlyCompoundTestData,
} from "../helper/__tests__/utilsTestData";

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
          assert.deepStrictEqual(res.body, yearlyCompoundTestData);
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

  describe("GET /interest/months", () => {
    it("When correct params Then should return OK status", (done) => {
      request(app)
        .get("/interest/months")
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
        .get("/interest/months")
        .query({
          initialDeposit: 1000,
          monthlyDeposit: 250,
          yearlyInterest: 1,
          numberOfYears: 5,
        })
        .then((res: any) => {
          assert.deepStrictEqual(res.body, monthlyCompoundTestData);
          done();
        })
        .catch((err: Error) => {
          throw err;
        });
    });

    it("When incorrect query params passed through Then should return UnprocessableEntity(422) status", (done) => {
      request(app)
        .get("/interest/months")
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
        .reply(200, { total: 100 });
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
            total: 2256,
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
