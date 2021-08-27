/*
Basic layout:

 * Get list of media file names
 * Name should include date
 * Order by date descending
 * Make template for each media file type
 * Add to body in order
*/

let listicle = document.getElementById('listOfAllLists');

async function get_media_names() {
    let result = [];
    let names = [];

    await fetch("list.txt")
        .then(response => response.text())
        .then(data => {
            console.log(data.split(" "));
            names = data.split(" ");
        });

    names.forEach(item => {
        let file_type = item.split(-3);
        console.log(file_type);
        let test_image = '<img src="'+ item +'" class="media">';
        result.push(test_image);
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
});