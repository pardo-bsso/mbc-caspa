describe("Header view", function() {
    it("Header element should exist", function() {
        $('#Panel').should.not.be.empty;
    }); 

            $('#Panel .now-playing-block #progress-bar')[0].style.width.should.be.equal('');
    describe("Track info", function() {
        it("Should display default values", function() {
            $('#Panel .now-playing-block #progress-bar')[0].style.width.should.be.equal('');
            $('#Panel .now-playing-block #previous').text().should.be.equal("");
            $('#Panel .now-playing-block #current').text().should.be.equal("Current track:");
            $('#Panel .now-playing-block #next').text().should.be.equal("");
        });

        it("Should display current track progress status", function(done) {
            var cb;

            cb = framestatus.on('backend:update', function() {
                $('#Panel .now-playing-block #progress-bar')[0].style.width.should.be.equal('42%');
                framestatus.off('backend:update', cb);
                done();
            });

            framestatus.trigger('backend:update', {currentFrame:84, totalFrames:200});
        });

        it("Should display previous, next and current track names", function(done) {
            var cb;

            cb = appstatus.on('change', function() {
                $('#Panel .now-playing-block #previous').text().should.be.equal("previous name");
                $('#Panel .now-playing-block #current').text().should.be.equal("Current track:current name");
                $('#Panel .now-playing-block #next').text().should.be.equal("next name");
                appstatus.off('change', cb);
                done();
            });

            var payload =  {
                piece: {
                    previous: {name: 'previous name'},
                    current:  {name: 'current name'},
                    next:     {name: 'next name'},
                },
                show: {
                    previous: {name: ''},
                    current:  {name: ''},                                                                                                                                
                    next:     {name: ''},
                },
                source: null,
                on_air: false,
            };

//XXX FIXME?: .trigger() no hace nada en la vista
            appstatus.set(payload);

        });

    });
});
