import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
chai.use(chaiHttp)
const should = chai.should();

describe('/GET to the app ', () => {
    it('should return the JSON file indicating that the app is working', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                res.body.should.have.property('status').that.equals(200);
                res.body.should.have.property('message');
                done();
            });
    });
})
