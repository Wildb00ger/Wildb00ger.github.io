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

async function create_card(item, name, file_type, description) {
    let title = '<h2 class="card_title">'+ name +'</h2>';
    let content;
    let card;

    switch (file_type) {
        case 'png':
            content = '<img src="'+ item +'" class="media">';
            
            // grab associated desciption if availble
            if (description) {
                await fetch("./media/" + name + ".txt")
                .then(response => response.text())
                .then(data => content += '<p class="media">' + data + '</p>');
            }

            break;
        case 'txt':
            let text;
            await fetch(item)
                .then(response => response.text())
                .then(data => text = data);
            content = '<p class="media essay">' + text + '</p>';
            break;
        case 'mp4':
            content = '<video class="media video" controls><source src="' + item + '" type="video/mp4">No suppport</video>';
            
            // grab associated desciption if availble
            if (description) {
                await fetch("./media/" + name + ".txt")
                .then(response => response.text())
                .then(data => content += '<p class="media">' + data + '</p>');
            }
            
            break;
    }

    card = '<div class="card">' + title + content + '</div>';
    return card;
}

async function get_media_names() {
    let result = ["", "", "", "", ""];
    let names = [];

    let re = /\/[\w-]*\.(png|txt|mp4)/;

    await fetch("list.txt")
        .then(response => response.text())
        .then(data => {
            console.log(data.split(" "));
            names = data.split(" ");
        });

    let carded = [];

    for (const [idx, item] of names.entries()) {
        let cleaned = (idx != names.length - 1) ? item : item.slice(0,-1);
        let name = cleaned.match(re)[0].slice(1,-4);
        let file_type = cleaned.slice(-3);

        let description_path = "./media/" + name + ".txt";
        let description = names.includes(description_path);
        let image_path = "./media/" + name + ".png";
        let is_desc_with_image = (names.includes(image_path) && file_type == "txt");

        if (!(item in carded) && !(is_desc_with_image)) {
            await create_card(item, name, file_type, description)
                .then(card => {
                    console.log(card);
                    listicle.innerHTML += card;
                    carded.push(item);
                });
        }
    }
}

get_media_names().then(() => {
    back_gradient_style.background = "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(193,196,125,1) 100%)";
    back_gradient_style.backgroundRepeat = "no-repeat";
    back_gradient_style.backgroundSize = "cover";
});