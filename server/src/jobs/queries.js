const getAllJobs = "SELECT * FROM emails_restaurants";
const getAllUncompletedJobs = "select * from public.emails_restaurants where completed = false";
const checkEmailExists = "SELECT s FROM emails_restaurants s where s.email = $1";
const addNewAlert = "INSERT INTO public.emails_restaurants( restaurants, emails, completed) VALUES ('$1', '$2', false);";
const removeEmail = "DELETE FROM emails_restaurants where emails = '$1'";


module.exports = {
    getAllJobs,
    getAllUncompletedJobs,
    addNewAlert,
    checkEmailExists,
    removeEmail
};