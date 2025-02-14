import FAQ from "../models/faqModel.js";
import {translate} from "@vitalets/google-translate-api";
import { redisClient } from "../services/cache.js";
 
const createFaq = async (req, res) =>{
    const {question, answer} = req.body;

    try {
        const question_hi = (await translate(question, {to: "hi"})).text;
        const question_bn = (await translate(question, {to: "bn"})).text;

        const answer_hi = (await translate(answer, {to: "hi"})).text;
        const answer_bn = (await translate(answer, {to: "bn"})).text;

        const faq = new FAQ({
            question,
            answer,
            translations:{
                hi:{
                    question: question_hi,
                    answer: answer_hi
                },
                bn:{
                    question: question_bn,
                    answer: answer_bn
                }
            }
        });
        faq.save();
        //deleting cache after creating faq
        redisClient.del("faqs:en");
        redisClient.del("faqs:hi");
        redisClient.del("faqs:bn");

        res.status(201).json({code: 200, status:"Success"});
    } catch (error) {
        console.log(error);
        res.status(400).json({status:"falure"});
    }
}

const getFaqs = async (req, res) => {
    try {
        const lang = req.query.lang || "en";
        const faqs = await FAQ.find({});
        if(faqs.length<= 0){
            return res.json(faqs);
        }
        const translatedFaqs = faqs.map((faq)=>({
            question: faq.translations[lang]?.question || faq.question,
            answer: faq.translations[lang]?.answer || faq.answer
        }));

        await redisClient.setEx(`faqs:`+lang, 3600, JSON.stringify(translatedFaqs));
        res.json(translatedFaqs);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error: "error encountered"});
    }
}

export { createFaq, getFaqs };