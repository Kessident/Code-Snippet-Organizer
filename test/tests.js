const request = require("supertest");
const assert = require("assert");
const Models = require("../models");
const app = require("../app");

before("Seed database", function (done) {
  let newSnippet = {
    title:"First Snippet",
    body:"const app = express();",
    language:"JavaScript"
  };
  let newUser = {
    username:"user1",
    password:"pass1"
  };
  Models.snippets.create(newSnippet).then(function () {
    Models.users.create(newUser).then(function () {
      done();
    });
  });
});

after("Destroy", function (done) {
 Models.snippets.destroy({where:{}}).then(function () {
   Models.users.destroy({where:{}}).then(function () {
     done();
   });
 });
});


describe("Users ", function () {
  let newUser = {
    username:"user2",
    password:"pass2"
  };

  it("should be able to singup", function (done) {
    request(app)
    .post("/signup")
    .send(newUser)
    .expect(201)
    .expect(function (res) {
      assert.equal(res.text, "Created. Redirecting to /signin");
    })
    .end(done);
  });

  it("should not be able to singup if already exist", function (done) {
    request(app)
    .post("/signup")
    .send(newUser)
    .expect(function (res) {
      assert.equal(res.text, "Found. Redirecting to /signup");
    })
    .end(done);
  });

  it("Should be able to signin", function (done) {
    request(app)
    .post("/signin")
    .send(newUser)
    .expect(function (res) {
      assert.equal(res.text, "Found. Redirecting to /");
    })
    .end(done);
  });
});
