import * as Yup from "yup";
import axios from "axios";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import logo from "../../assets/images/logo.png";
import ModalComponent from "../Modal";
import PredictionScreen from "../PredictionScreen";
import Loading from "../Loading";
import { useState } from "react";
import { BASE_URL } from "../../constants";

export const formValidationSchema = Yup.object({
  age: Yup.string().max(255).required("Age is required"),
  organType: Yup.string().max(255).required("Organ type is required"),
  bmi: Yup.string().max(255).required("BMI is required"),
  bloodPressure: Yup.string().max(255).required("Blood Pressure is required"),
  bloodType: Yup.string().max(255).required("BloodType is required"),
  glucose: Yup.string().max(255).required("Glucose is required"),
  surgery: Yup.string().max(255).required("Surgery is required"),
});

const initialFormValues = {
  age: "",
  organType: "",
  bmi: "",
  bloodPressure: "",
  bloodType: "",
  age: "",
  glucose: "",
  surgery: "",
};

const FormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [supervisedResult, setSupervisedResult] = useState({});
  const [unsupervisedResult, setUnupervisedResult] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const handleOnSubmit = async (values) => {
    try {
      setIsLoading(true);
      handleValidation(values);
      const supervisedResponse = await axios.post(
        `${BASE_URL}/api/supervised/predict`,
        values
      );

      setSupervisedResult(supervisedResponse?.data);

      setIsLoading(false);
      setIsOpen(true);
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleValidation = (values) => {
    const { age } = values;
    if (age == 28) setIsFetching(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div class="flex flex-wrap -mx-4  items-center justify-center py-24">
          <div
            class="w-full px-4 flex  items-center justify-center bg-no-repeat bg-center bg-fixed"
            style={{
              backgroundImage: `url(${logo})`,
            }}
          >
            <div class="hero-content flex-col flex">
              <h1
                class="
                  text-dark
                  font-bold
                  text-4xl
                  sm:text-[42px]
                  lg:text-[40px]
                  xl:text-[42px]
                  leading-snug
                  mb-3
                "
              >
                Donor Data
              </h1>
              <p class="text-base mb-8 text-body-color max-w-[480px]">
                Input your data here
              </p>

              <Formik
                initialValues={initialFormValues}
                validationSchema={formValidationSchema}
                onSubmit={(values) => {
                  handleOnSubmit(values);
                }}
              >
                {({ errors, handleChange, touched, values }) => (
                  <Form>
                    <div class="flex flex-wrap -mx-4">
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            Type of donation (Living/Deceased)
                          </label>
                          <input
                            type="text"
                            placeholder={`Type of donation (Living/Deceased)`}
                            name="donationType"
                            onChange={handleChange}
                            value={values.age}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                        ${
                          touched.age &&
                          errors.age &&
                          "focus:border-error active:border-error"
                        }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.age && errors.age && "input-error"}
                        `}
                          />
                          {touched.age && errors.age && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.age}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            Type of organ (Kidney/liver)
                          </label>
                          <select
                            placeholder="Type of organ (Kidney/liver)"
                            name="organType"
                            onChange={handleChange}
                            value={values.organType}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.organType &&
                            errors.organType &&
                            "focus:border-error active:border-error"
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${
                          touched.organType && errors.organType && "input-error"
                        }
                        `}
                          >
                            <option value="">Select organ type</option>
                            <option value="1">Kidney</option>
                            <option value="2">Liver</option>
                          </select>
                          {touched.organType && errors.organType && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.organType}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            BMI (Body Mass Index) less than or equal to 35
                          </label>
                          <input
                            type="text"
                            placeholder="BMI (Body Mass Index) less than or equal to 35"
                            name="bmi"
                            onChange={handleChange}
                            value={values.bmi}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.bmi &&
                            errors.bmi &&
                            "focus:border-error active:border-error"
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.bmi && errors.bmi && "input-error"}
                        `}
                          />
                          {touched.bmi && errors.bmi && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.bmi}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            Blood pressure
                          </label>
                          <input
                            type="text"
                            placeholder="Blood Pressure"
                            name="bloodPressure"
                            onChange={handleChange}
                            value={values.bloodPressure}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.bloodPressure &&
                            errors.bloodPressure &&
                            "focus:border-error active:border-error"
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${
                          touched.bloodPressure &&
                          errors.bloodPressure &&
                          "input-error"
                        }
                        `}
                          />
                          {touched.bloodPressure && errors.bloodPressure && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.bloodPressure}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            Blood type
                          </label>
                          <input
                            type="text"
                            placeholder="Blood type"
                            name="bloodType"
                            onChange={handleChange}
                            value={values.bloodType}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.bloodType &&
                            errors.bloodType &&
                            "focus:border-error active:border-error"
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${
                          touched.bloodType && errors.bloodType && "input-error"
                        }
                        `}
                          />
                          {touched.bloodType && errors.bloodType && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.bloodType}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            Age (Less than age 18 or over age 65)
                          </label>
                          <select
                            placeholder="Age (Less than age 18 or over age 65)"
                            name="age"
                            onChange={handleChange}
                            value={values.age}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.age &&
                            errors.age &&
                            "focus:border-error active:border-error"
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.age && errors.age && "input-error"}
                        `}
                          >
                            <option value="">Select Your Choice</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </select>
                          {touched.age && errors.age && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.age}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            Glucose level
                          </label>
                          <input
                            type="text"
                            placeholder="Glucose level"
                            name="glucose"
                            onChange={handleChange}
                            value={values.glucose}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.glucose &&
                            errors.glucose &&
                            "focus:border-error active:border-error"
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.glucose && errors.glucose && "input-error"}
                        `}
                          />
                          {touched.glucose && errors.glucose && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.glucose}
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="w-full md:w-1/2 lg:w-1/4 px-4">
                        <div class="mb-12">
                          <label
                            for=""
                            class="font-medium text-base text-black block mb-3"
                          >
                            Be willing to commit to the pre-donation evaluation
                            process, surgery and the burden of recovery(Yes/no)
                          </label>
                          <input
                            type="text"
                            placeholder="Surgery and the burden"
                            name="surgery"
                            onChange={handleChange}
                            value={values.surgery}
                            class={`w-full
                        border-[1.5px] border-form-stroke
                        rounded-lg
                        py-3
                        px-5
                        font-medium
                        text-body-color
                        placeholder-body-color
                        outline-none
                        focus:border-primary
                        active:border-primary
                          ${
                            touched.surgery &&
                            errors.surgery &&
                            "focus:border-error active:border-error"
                          }
                        transition
                        disabled:bg-[#F5F7FD] disabled:cursor-default
                        ${touched.surgery && errors.surgery && "input-error"}
                        `}
                          />
                          {touched.surgery && errors.surgery && (
                            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                              {errors.surgery}
                            </span>
                          )}
                        </div>
                      </div>

                      <div class="w-full flex justify-center mt-4">
                        <button
                          class="text-base
                  font-medium
                  text-white
                  bg-[#3D4451]
                  rounded-lg
                  py-3
                  px-7
                  hover:bg-opacity-90 w-1/2"
                        >
                          Analize
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <ModalComponent
            isOpen={isOpen}
            modalContent={
              <PredictionScreen
                onClose={handleModalClose}
                supervisedResult={supervisedResult}
                unsupervisedResult={unsupervisedResult}
                isFetching={isFetching}
              />
            }
            handleClose={handleModalClose}
            showCloseIcon={false}
          />
        </div>
      )}
    </>
  );
};

export default FormComponent;
