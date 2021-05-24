import * as utils from "../utils";
import axios from "axios";
import moxios from "moxios";
import assert from "assert";

require("dotenv").config();
import { testData } from "./utilsTestData";

let sinon = require("sinon");

describe("utils", () => {
  let stub: any;
  let date: Date;
  beforeEach(() => {
    date = new Date(2021, 1, 1, 1, 1, 1, 0);

    stub = sinon.stub(Date, "now");
    stub.returns(date);

    moxios.install(axios);
  });

  afterEach(() => stub.restore());
  afterEach(() => moxios.uninstall());

  describe("getClosingPriceData", () => {
    it("get request is made to get closing data", (done) => {
      moxios.stubRequest("https://eodhistoricaldata.com/api/eod/MCD.US", {});

      moxios.wait(() => {
        moxios.requests.mostRecent().respondWith({
          status: 200,
          response: testData,
        });
      });

      utils
        .getClosingPriceData("2020-01-1", "2021-01-01", "d", "MCD.US", "json")
        .then((response) => {
          assert.deepStrictEqual(response, testData);
        })
        .then(done, done);
    });

    it("Should handle error on get", async () => {
      moxios.stubRequest("https://eodhistoricaldata.com/api/eod/MCD.US", {});

      moxios.wait(() => {
        moxios.requests.mostRecent().respondWith({
          status: 404,
          response: { error: "BAD" },
        });
      });

      await assert.rejects(
        (async () =>
          utils.getClosingPriceData(
            "2020-01-1",
            "2021-01-01",
            "d",
            "MCD.US",
            "json"
          ))()
      );
    });
  });
});
