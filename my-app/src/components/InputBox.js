import './InputBox.css';
import React, {useState, useEffect} from 'react';
import { Configuration, OpenAIApi } from 'openai';

   
function InputBox() {
    const url = "https://api.openai.com/v1/engines/text-curie-001/completions"
    const [data, setData] = useState([]);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputText = new FormData(e.target),
        setInputText = Object.fromEntries(inputText.entries());

    //API 
        const configuration = new Configuration({
            apiKey: `${process.env.REACT_APP_OPENAI_SECRET}`,
        });
        const openai = new OpenAIApi(configuration);
        await openai.createCompletion('text-curie-001', {
                prompt: `${setInputText.prompt}`,
                temperature: 1,
                max_tokens: 256
            })
                
            .then((response) => {
                setData([
                    {
                       prompt: `${setInputText.prompt}`,
                       response: `${response.data.choices[0].text}`,
                       id: data.length
                    },
                    ...data,
                ]);
            });

    };

    useEffect(() => {
        const storedata = localStorage.getItem('data');
        if (storedata) {
          setData(JSON.parse(storedata));
        }
      }, []);
      useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data))
      }, [data]);  
    



    return(
        <div className='container'>    
            <form
                className='inputBox' 
                action=''
                type= "text" 
                onSubmit= {handleSubmit}
                size='100'>
                <label className='label'>Enter Prompt</label>
                <textarea className='textArea' name='prompt'/>       
                <button className='submit' type="submit" value="Submit">Submit</button>
            </form>
            
            <div className = 'results'>
                <ul>
                    <span>{data}</span>
                </ul>
            </div>
        </div>
    
        
                        
        
    );
}

export default InputBox;


//<li>{data[0].response}</li>
//
/*useEffect(() => {
    fetch(url, {
       method: "POST",
       headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
         },
       body: JSON.stringify(data),
       })
       .then(res => res.json())
       .then(data => {
           console.log('Success:', data);
           prompt = data.text;
           console.log(prompt);
           
       })
       .catch((err) => {
       console.error('Error:' , err);
       });
}, [prompt])

onClick={() => setPrompt(prompt.text)}
*/

    /*const data = {
        "prompt": '{textInput}',
        "max_tokens": 5,
        "temperature": 1,
        "top_p": 1,
        "n": 1,
        "stream": false,
        "logprobs": null,
        "stop": "\n"
       };
    */

       /*
       
        */