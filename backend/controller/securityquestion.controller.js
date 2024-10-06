import SecurityQuestion from "../model/securityquestion.model.js";

export const verifyAnswer = async (req, res) => {
    try {
        const { ans1, ans2, ans3, ans4, ans5 } = req.body;
        const answers =  await SecurityQuestion.find();
        answers.map((ans)=>{
            console.log(ans)
            // res.status(200).json(ans)
            if (ans1 === ans.ans1 && ans2 === ans.ans2 && ans3 === ans.ans3 && ans4 === ans.ans4 && ans5 === ans.ans5) {
                console.log('admin verifyed')
                res.status(200).json({ message: 'admin verify successful' });
                return;
            }else{
                console.log('Anwser are wrong')
                res.status(401).json({ message: 'Invalid answers' });
                return;
            }
        })
    } catch (error) {
        
    }
}


export const postAns = async (req, res) => {
    try {
        // const {ans1, ans2, ans3, ans4, ans5} = req.body;
        const saveAns = new SecurityQuestion({
            ans1 : 'hen',
            ans2 : 'mama',
            ans3 : 'sindh',
            ans4 : 'mehran',
            ans5 : 'hyd'
         });
         await saveAns.save();
         res.status(201).json({ message: 'Security questions added successfully' });
         console.log(saveAns)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
        
    }
}