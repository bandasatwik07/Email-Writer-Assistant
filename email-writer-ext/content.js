console.log("Email Writer Extension - Content Script Loaded");

function createAIButton(){
    console.log("createAI btt")
    const button= document.createElement('div');
    button.className="T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button";
    button.style.marginRight='8px';
    button.innerHTML='AI Reply';
    button.setAttribute('role','button');
    button.setAttribute('data-tooltip','Generate AI Reply');
    return  button;
}

function getEmailContent(){

    const selectors=[
        '.h7',
        '.a3s.aiL',
        '[role="presentation"]',
        '.gmail_quote'
    ];
    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        }
        return '';
    }
}
function findComposeToolbar(){
    console.log("findComposeToolBAR");

    const selectors=[
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for(const selector of selectors){
        const toolBar = document.querySelector(selector);
        console.log("toolBar1",selector,toolBar);
        if(toolBar){
            return toolBar;
        }
    }
    return null;
}


function injectButton(){
    const existingButton =document.querySelector('.ai-reply-button')
    if(existingButton)existingButton.remove();

    const toolBar=findComposeToolbar();
    if(!toolBar){
        console.log("Toolbar not found");
        return ;
    }
    console.log("toolbar found");
    const button=createAIButton();
    button.classList.add('.ai-reply-button');

    button.addEventListener('click',async()=>{
        try {
            button.innerHTML='Generating...';
            button.disabled=true;

            const emailContent= getEmailContent();

            const response= await fetch('http://localhost:8080/api/email/generate',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });
            
            if(!response.ok){
                throw new Error('API Request Failed')
            }
            
            const generatedReply= await response.text();

            const composeBox= document.querySelector('[role="textbox"][g_editable="true"]');

            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText',false,generatedReply);
            }else{
                console.log("ComposeBox not found");
            }
            
            
        } catch (error) {
            alert("Failed to generate Reply: ",error);
            
        }finally{
            button.innerHTML='AI Reply',
            button.disabled=false;
        }
    })

    toolBar.insertBefore(button,toolBar.firstChild);

}

const observer = new MutationObserver((mutations)=>{
    for(const mutation of mutations){
        const addedNodes= Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node=>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]')|| node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if(hasComposeElements){
            console.log("Compose Window Detected");
            setTimeout(injectButton,1000);
        }

    }
});


observer.observe(document.body,{
    childList:true,
    subtree:true
});