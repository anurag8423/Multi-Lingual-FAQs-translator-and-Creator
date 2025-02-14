import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, server } from '../index.js';
import FAQ from '../models/faqModel.js'; 
import { redisClient } from '../services/cache.js';

const { expect } = chai;
chai.use(chaiHttp);

describe("FAQ API Tests", function () {
    this.timeout(5000);

    before(async () => {
        await FAQ.deleteMany();
    });

    it("should create a new FAQ", (done) => {
        chai.request(app)
            .post("/api/faqs/create")
            .send({
                question: "What is Node.js?",
                answer: "Node.js is a JavaScript runtime.",
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property("status", "Success");
                done();
            });
    });

    it("should fetch FAQs", (done) => {
        chai.request(app)
            .get("/api/faqs?lang=en")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            });
    });

    after(async () => {
        await redisClient.del("faqs:en");
        server.close(() => console.log("Server closed after tests.")); 
    });
});
