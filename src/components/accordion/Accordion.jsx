import React, { useState } from "react";
import { PiCaretDownThin, PiCaretUpThin } from "react-icons/pi";
import { BsTrash3, BsPencil } from "react-icons/bs";
import { GoIssueClosed } from "react-icons/go";
import { SlClose } from "react-icons/sl";
import { calculateAge, validate } from "../../utils/helper";
import { genderLookup } from "../../utils/constants";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteAccordion from "./DeleteAccordion";

const Accordion = (props) => {
    const { data, handler, itemKey } = props;
    const { celeb, selected, editMode, celebList } = data;
    const { setSelected, setEditMode, setCelebList, setFilteredCelebrityList } = handler;

    const { picture, first, last, dob, gender, country, description, age, fullname } = celeb;

    let genderDesc
    if (gender && Array.isArray(genderLookup) && genderLookup?.length > 0) {
        genderDesc = genderLookup?.filter(g => g?.value === gender)
    }
    // console.log("Gender Description =>", genderDesc);


    const userAge = calculateAge(dob)
    const initialValues = {
        fullname: fullname ?? (first + ' ' + last),
        age: userAge,
        gender: gender,
        country: country,
        description: description
    };

    const [updatedCelebData, setUpdatedCelebData] = useState(initialValues)
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [errors, setErrors] = useState({});
    const [deleteMode, setDeleteMode] = useState(false)

    const toggle = (itemKey) => () => {
        if (!editMode) {
            setSelected(selected === itemKey ? null : itemKey);
        }
    };

    const handleEdit = () => {
        setEditMode(true)
        setEnableSubmit(false)
        setErrors({})
        setSelected(itemKey)
    };

    const handleDelete = () => {
        if (Array.isArray(celebList) && celebList?.length > 0) {
            const listAfterDeletion = celebList?.filter( celeb => celeb?.id !== itemKey)
            console.log(`List after deletion of ${itemKey} =>`, listAfterDeletion);
            setCelebList(listAfterDeletion)
            setFilteredCelebrityList(listAfterDeletion)
        }
        setDeleteMode(false);
    }

    const handleInputChange = (event) => {
        setErrors({})
        const { id, value } = event?.target;
        let updatedValue = id === "age" ? Number(value) : value;
        setUpdatedCelebData({ ...updatedCelebData, [id]: updatedValue });

        const error = validate(id, updatedValue);
        if (error) {
            setErrors({ ...errors, [id]: error });
        } else {
            const { [id]: removedError, ...rest } = errors;
            setErrors(rest);
        }
        // setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));

        if (initialValues[id] !== value) {
            setEnableSubmit(true);
        } else if (initialValues[id] === value) {
            setEnableSubmit(false);
        }
    };

    const handleCancel = () => {
        setEditMode(false)
        setUpdatedCelebData(initialValues)
    };

    const handleSubmit = () => {
        console.log("Submit =>", errors);

        if (Object.keys(errors).length > 0) {
            toast.error("Please fill in all required fields");
            return;
        }

        console.log("Updated celebrity data =>", updatedCelebData);

        const index = celebList.findIndex(celeb => celeb.id === itemKey);
        console.log("Index =>", index);
        if (index !== -1) {
            const updatedList = [...celebList];
            updatedList[index] = { ...updatedList[index], ...updatedCelebData };
            setCelebList(updatedList);
            setFilteredCelebrityList(updatedList);
        }

        setEditMode(false);
        toast.success("Changes saved successfully!");
    };


    return (
        <div className="row justify-content-center my-3">
            <div className="col-8  px-0">
                <div className="item">
                    {
                        deleteMode ?
                            <DeleteAccordion
                                handlers={{
                                    setDeleteMode,
                                    handleDelete
                                }}
                            />
                            :
                            <>
                                <div className="accordion-header d-flex align-items-center p-3 my-2" onClick={toggle(itemKey)}>
                                    <img src={picture} className="celeb-profile-picture mx-2" alt="" />
                                    {
                                        (editMode && selected === itemKey) ?
                                            <>
                                                <div className="col-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="fullname"
                                                        value={updatedCelebData?.fullname}
                                                        required
                                                        onChange={handleInputChange}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    {
                                                        errors?.fullname && (
                                                            <div className="text-danger">{errors?.fullname}</div>
                                                        )
                                                    }
                                                </div>
                                            </>
                                            :
                                            <h5 className="celeb-name mx-2 my-0">{fullname ?? `${first} ${last}`}</h5>
                                    }
                                    <span className="caret-icon ms-auto">
                                        {
                                            selected === itemKey ? < PiCaretUpThin className="caret-down" /> : < PiCaretDownThin className="caret-down" />
                                        }
                                    </span>
                                </div>
                                <div className={selected === itemKey ? "accordian-body show p-3 mx-3" : "accordian-body"}>
                                    {
                                        editMode ?
                                            <>
                                                <div className="row justify-content-start">
                                                    <div className="col-4">
                                                        <label className="form-label accordion-body-title">
                                                            Age
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="age"
                                                            value={updatedCelebData?.age}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        {
                                                            errors?.age && (
                                                                <div className="text-danger">{errors?.age}</div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="col-4">
                                                        <label className="form-label accordion-body-title">
                                                            Gender
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            id="gender"
                                                            value={updatedCelebData?.gender}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="" disabled>Select Gender</option>
                                                            {
                                                                Array.isArray(genderLookup) && genderLookup.length > 0 && genderLookup.map(gender => (
                                                                    <option key={gender?.value} value={gender?.value}>{gender?.label}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        {
                                                            errors?.gender && (
                                                                <div className="text-danger">{errors?.gender}</div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="col-4">
                                                        <label className="form-label accordion-body-title">
                                                            Country
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="country"
                                                            value={updatedCelebData?.country}
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                        {
                                                            errors?.country && (
                                                                <div className="text-danger">{errors?.country}</div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row justify-content-start my-2">
                                                    <div className="col-12">
                                                        <label className="form-label accordion-body-title">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            className="form-control"
                                                            rows={4}
                                                            id="description"
                                                            value={updatedCelebData?.description}
                                                            required
                                                            onChange={handleInputChange}
                                                        ></textarea>
                                                        {
                                                            errors?.description && (
                                                                <div className="text-danger">{errors?.description}</div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row justify-content-end">
                                                    <div className="col-auto p-0">
                                                        <button
                                                            type="submit"
                                                            className="btn"
                                                            onClick={handleCancel}
                                                        // disabled={enableSave ? false : true}
                                                        >
                                                            <SlClose className="cancel-icon" />
                                                        </button>
                                                    </div>
                                                    <div className="col-auto p-0">
                                                        <button
                                                            type="button"
                                                            className="btn"
                                                            disabled={enableSubmit ? false : true}
                                                            onClick={handleSubmit}
                                                        >
                                                            <GoIssueClosed className="save-icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <label className="form-label accordion-body-title">
                                                            Age
                                                        </label>
                                                        <p>{`${age ?? userAge} Years`}</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <label className="form-label accordion-body-title">
                                                            Gender
                                                        </label>
                                                        <p>{genderDesc?.[0]?.label ?? gender}</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <label className="form-label accordion-body-title">
                                                            Country
                                                        </label>
                                                        <p>{country}</p>
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label accordion-body-title">
                                                            Description
                                                        </label>
                                                        <p>{description}</p>
                                                    </div>
                                                </div>

                                                <div className="row justify-content-end">
                                                    <div className="col-auto p-0">
                                                        <button
                                                            type="button"
                                                            className="btn"
                                                            onClick={() => setDeleteMode(true)}
                                                        >
                                                            <BsTrash3 className="delete-icon" />
                                                        </button>
                                                    </div>
                                                    {
                                                        userAge >= 18 ? (
                                                            <div className="col-auto p-0">
                                                                <button
                                                                    type="button"
                                                                    className="btn"
                                                                    onClick={handleEdit}
                                                                >
                                                                    <BsPencil className="edit-icon" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </div>
                                            </>
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div >
    );
};

export default Accordion;
