import { Pitches, Offers } from "../models/pitches.js"
import { Router } from "express";
import mongoose from "mongoose";

const router = Router()

router.get('/', async (req, res) => { //Response will all documents
    try {
        const pitchDoc = await Pitches.find().sort({ 'createdAt': "desc" }).populate('offers')
            .select("-createdAt").select('-updatedAt')
        return res.status(200).json(pitchDoc)
    } catch (e) {
        console.error(e)
        return res.status(500).send("Internal Server Error")
    }

})

router.post('/', async (req, res) => { //Register a Pitches
    //TODO Validation of request body
    if(req.body.entrepreneur==null||req.body.pitchIdea==null||req.body.pitchTitle==null||req.body.askAmount==null||req.body.equity==null||req.body.equity>100||req.body.equity<0)
    return res.status(400).send("Bad Request")
    try {
        const newPitch = new Pitches({
            entrepreneur: req.body.entrepreneur,
            pitchTitle: req.body.pitchTitle,
            pitchIdea: req.body.pitchIdea,
            askAmount: req.body.askAmount,
            equity: req.body.equity
        })

        const newPitchDoc = await newPitch.save()
        return res.status(201).json({ id: newPitchDoc._id })

    } catch (err) {
        console.error(err)
        return res.status(500).send("Internal Server Error")
    }
})

router.get('/:id', async (req, res) => { //Response with Pitch with given ID and offers 
    try {

        const pitchDoc = await Pitches.findById(req.params.id).populate('offers')
            .select("-createdAt").select('-updatedAt')

        if (pitchDoc == null) {
            return res.status(404).send('Pitch Not Found')
        }
        return res.status(200).json(pitchDoc)

    } catch (e) {
        console.error(e)
    }
})

router.post("/:id/makeOffer", async (req, res) => { //Response with id of pitch 
    //TODO Validation of offer request body and pitch id
   
    try {
        const pitchId = req.params.id
        const pitchDoc = await Pitches.findById(pitchId)
        if(pitchDoc==null){
            return res.status(404).send("Not Found")
        }
        if(req.body.investor==null||req.body.amount==null||req.body.equity==null||req.body.comment==null)
        return res.status(400).send("Bad Request")
        const offer = new Offers({
            investor: req.body.investor,
            amount: req.body.amount,
            equity: req.body.equity,
            comment: req.body.comment
        })
        const offerDoc = await offer.save()

       
        pitchDoc.offers.push(offerDoc)
        await pitchDoc.save()

        return res.status(201).json({ id:offerDoc._id })
    } catch (e) {
        console.log(e)
        return res.status(500)
    }
})

export default router