import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions,{answers} from '../database/data.js';

/**get all questions */
export async function getQuestions(req,res){
//    res.json("questions api get request")
      try {
        const q =await Questions.find();
        res.json(q)        
      } catch (error) {
        res.json({error})        
      } 
}

/**insert all questions */
export async function insertQuestions(req, res){
    try {
        Questions.insertMany({ questions: questions, answers:answers }).then((err,data)=>{
            res.json({ msg: "Data Saved Successfully...!"})
        }).catch((error)=>{
            res.json({error})
        })
    } catch (error) {
        res.json({ error })
    }
}

/**Delete all questions */
export async function deleteQuestions(req,res){
    try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}


/**get all result */
export async function getResult(req,res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/**post all result */
export async function postResult(req,res){
    try {
        const { username, result, attempts, points, achived } = req.body;
        if(!username && !result) throw new Error('Data Not Provided...!');

        Results.create({ username, result, attempts, points, achived }).then((err, data)=>{
            res.json({ msg : "Result Saved Successfully...!"})
        }).catch((error)=>{
            res.json({error})
        })

   } catch (error) {
        res.json({error})
   }
}

/**delete all result */
export async function deleteResult(req,res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}