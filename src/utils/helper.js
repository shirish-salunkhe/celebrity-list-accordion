export const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birthday hasn't occurred yet this year, then i am decrementing 1 from the age
    if ( monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ) {
        age--;
    }

    return age;
};

export const validate = (id, value) => {
    let error = "";

    if (!value) {
        error = "This field is required";
    } else if (id === "country" && /\d/.test(value)) {
        error = "Country name should not contain numbers";
    }

    return error;
};
