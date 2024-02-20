

function newBlogPost (newText){
    const postsSection = document.getElementById('posts');
    if (postsSection){
        const oDiv = document.createElement('div');
        oDiv.className = 'row justify-content-center text-center';
        if(oDiv){
            const iDiv = document.createElement('div');
            iDiv.className = 'col-10';
                if(newText !== null && newText !== ''){
                    //making a p element with atttributes
                    const para = document.createElement('p')
                    para.className ='text-dark bg-secondary border border-primary-subtle rounded-3 m-2 p-1';
                    para.id = 'autoPost';
                    //making a span element
                    const nSpan = document.createElement('span');
                    nSpan.setAttribute('class', 'badge bg-primary')
                    //making date variable
                    const currentDate = new Date();
                    const formattedDate = `Posted on ${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
                    nSpan.textContent = formattedDate;
                   //appending stuff and things
                   //oDiv.appendChild(iDiv);
                    para.appendChild(nSpan);
                    para.appendChild(document.createTextNode(newText)); //this the reader to append the newText var as being after the span element so it pushes it to the start of the text as I originally wanted
                    iDiv.appendChild(para);
                    oDiv.appendChild(iDiv);
                    postsSection.appendChild(oDiv);
                } else {
                        console.error(`No post content found`);
                }
        } else {
            console.error(`oDiv is not setting properly`);
        }
    } else {
        console.error(`element with id posts is not found`);
    }
    
};
newBlogPost("okay the function works to insert new content.I have used figma to come up with a better layout for the blog in general and at the bottom of this page is a pic of the current working model I will give it a week and see if I still like it...if not I will change it. for now I have made progress on this version and its time to commit a new branch! Good night netcity");
newBlogPost("I wonder if writing this to html is even a good idea, wouldn't it just clutter up the index file after a while? I wonder what a better way to do this would be. Okay the current structure is a function that searches for my posts section by id and then within it creates 2 nested div elements (by appending order). Then it creates a <p> element and a <span> element. and of course each element gets passed class attributes so they look the same as the first two posts within the bootstrap framework. All off the elements are nested inside of if statements so that I can throw errors if any part of the function is not working it will help me track down where. the real fun began when I tried to get the <span> which is functioning as my date stamp to appear at the beginning of the text post instead of at the end, which was the default when using a logical appending heirarchy. I tried using before() and after() methods but those placed the span outside of the p element entirely. so the fix ultamitely was para.appendChild(document.createTextNode(newText)) in the line right after I append my span element into my p element.As far as I understand this creates a text node that is a child node of the p element , just like the span element, and since I have the span element appending first it gets listed first within the children of the p element and BOOOOM its working. The later stages of this will include refactoring the code. Ultamitely when this goes live I want to be able to log in as an admin and do this through a button, which I tried to do already but there are clear security issues there if anyone can just jam anything into this thing. For today I have a working function for all my new posts that does not require me to build new html every time.")



