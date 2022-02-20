const bcrypt = require("bcrypt")


exports.matchPassword = async (actual,entered) => {

    console.log(actual,entered)
    
    const result = await bcrypt.compare(actual,entered)
    return result
    
}