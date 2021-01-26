// function to get the homepage
let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

module.exports = {
    getHomepage: getHomepage    
};