describe("App globals", function() {
  it ("mediaDB should exist", function() {
    mediaDB.should.be.defined;
  });

  it ("mediaDB should not be empty", function() {
    mediaDB.get('collection').models.should.not.be.empty;
  });

  it ("mediaList should exist", function() {
    mediaDB.should.be.defined;
  });

  it ("mediaList should not be empty", function() {
    mediaList.isEmpty().should.be.false;
  });

  it ("Universe should exist", function() {
    Universe.should.be.defined;
  });

  it ("Universe should not be empty", function() {
    Universe.isEmpty().should.be.false;
  });

  it ("appstatus should exist", function() {
    appstatus.should.be.defined;
  });

  it ("framestatus should exist", function() {
    framestatus.should.be.defined;
  });
});
