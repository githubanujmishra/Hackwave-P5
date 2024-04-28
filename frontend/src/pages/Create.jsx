import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader, Dropdown } from "../components";

const Create = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: currentUser.username,
    model: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("PlaygroundAI");

  const handleChange = (e) => {
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [e.target.name]: e.target.value,
        model: selectedModel,
      };
      // console.log(JSON.stringify(updatedForm)); // Log updatedForm
      return updatedForm;
    });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // This is taking care of the image Generation.
  const generateImage = async () => {
    // if (form.prompt) {
    //   try {
    //     setGeneratingImg(true);
    //     const response = await fetch('/api/v1/generate', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
               // model:  form.model,
    //         prompt: form.prompt,
    //       }),
    //     });
    //     const data = await response.json();
    //     setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
    //   } catch (err) {
    //     alert(err);
    //   } finally {
    //     setGeneratingImg(false);
    //   }
    // } else {
    //   alert('Please provide proper prompt');
    // }
  };

  // This is taking care of the share with community feature.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (form.prompt && form.photo) {
    //   setLoading(true);
    //   try {
    //     const response = await fetch('https://dalle-arbb.onrender.com/api/v1/post', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ ...form }),
    //     });

    //     await response.json();
    //     alert('Success');
    //     navigate('/');
    //   } catch (err) {
    //     alert(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // } else {
    //   alert('Please generate an image with proper details');
    // }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {/* <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          /> */}

          <Dropdown
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Create;
