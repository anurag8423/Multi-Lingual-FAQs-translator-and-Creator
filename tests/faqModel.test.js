import { expect } from "chai";
import mongoose from "mongoose";
import FAQ from "../models/faqModel.js";

describe("FAQ Model Tests", () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it("create a FAQ", async () => {
        const faq = new FAQ({
            question: "What is JavaScript?",
            answer: "JavaScript is a programming language."
        });

        const savedFaq = await faq.save();
        expect(savedFaq).to.have.property("_id");
        expect(savedFaq.question).to.equal("What is JavaScript?");
    });
});
