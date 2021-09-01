/*
Basic layout:

 * Get list of media file names
 * Name should include date
 * Order by date descending
 * Make template for each media file type
 * Add to body in order
*/

let listicle = document.getElementById('listOfAllLists');
let back_gradient_style = document.getElementsByTagName("html")[0].style;

async function create_card(item, name, file_type) {
    let title = '<h2 class="card_title">'+ name +'</h2>';
    let content;
    let card;

    switch (file_type) {
        case 'png':
            content = '<img src="'+ item +'" class="media">';
            break;
        case 'txt':
            let text;
            await fetch(item).then(response => text = response.text());
            content = '<p class="media">' + text + '</p>';
            break;
    }

    card = '<div class="card">' + title + content + '</div>';
    return card;
}

async function get_media_names() {
    let result = [];
    let names = [];

    let re = /\/[\w-]*\.png/;

    await fetch("list.txt")
        .then(response => response.text())
        .then(data => {
            console.log(data.split(" "));
            names = data.split(" ");
        });

    names.forEach((item, idx) => {
        // grab parts of path
        let cleaned = (idx != names.length - 1) ? item : item.slice(0,-1);
        let name = cleaned.match(re)[0].slice(1,-4);
        let file_type = cleaned.slice(-3);

        console.log(item, name, file_type, idx);

        // construct card
        //let title = '<h2 class="card_title">'+ name +'</h2>';
        //let test_image = '<img src="'+ item +'" class="media">';
        //let card = '<div class="card">' + title + test_image + '</div>';

        create_card(item, name, file_type)
            .then(test_card => {
                //console.log(idx);
                //console.log(test_card + '\n' + card);
                result.push(test_card);
            });

        //result.push(card);
    });

    console.log(result);
    return result;
}

get_media_names().then(result => {
    let insert = "";

    // more complicated handling goes here
    result.forEach(img => {
        insert = insert.concat(img);
    });

    console.log(insert);
    
    listicle.innerHTML = insert;

    back_gradient_style.background = "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(193,196,125,1) 100%)";
    back_gradient_style.backgroundRepeat = "no-repeat";
    back_gradient_style.backgroundSize = "cover";
});

/*
background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(187,191,120,1) 100%);
background-repeat: no-repeat;
background-size: cover;
*/