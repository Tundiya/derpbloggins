

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
newBlogPost("Okay it seems that the date stamps are are posting only the most current date of whatever post is most recent, which in retrospect makes sense as I dont have the date being saved anywhere.Ok so some progress this week and some struggle! still blasting cousera course thats all going well. I have a layout ready for this blog I have experimented with using both bootstrap default grid and css grid to try and see how it builds out...needless to say I think default grid is going to be the path forward. I spend a nice portion of the day learning how to extract sass files from bootstrap and switching between the different grid systems, recompiling etc. I have to rebuild the blog layout as it was more or less destroyed when I tried to switch to different grid system. I think instead of fixing the date stamp issue now I will prioritize pushing out the new layout and after that with my card elements/'modals being the blog posts I will attempt to save the post date to local file for now and if that works kinda of use that system until a real back end can be developed in the future. I think that can work for all kinds of data I need to save for the blog that is going to be made with functions and OOP systems I make over time. I have learned a lot more about html meta data as well as more proper html structure that is more readable for bots and SEO. I have began to delve into little bits of animation through the course materal, so far on canvas. I have had a cool idea for a little 2d browser game for a long time and I hope I can learn enough through this course to get a firm grasp on how to go forward with it. If not then in the future when I have time I would really like to delve into it a little bit more. I think with electron and react it should be possible to publish it on mobile as well. Oh well that is for a future endeavor! So all in all another big week, more stuff breaking, a lot of learning, a lot of growing pains. Alas, we press on! p.s on this push I updated metadata in the header and fixed some typos");


