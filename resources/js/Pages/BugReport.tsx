import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';

interface FormData {
  feedback_type: string;
  subject: string;
  description: string;
  screenshot: File | null;
}

export default function BugForm({ auth }: PageProps) {
  const [formData, setFormData] = useState<FormData>({
    feedback_type: "Bug",
    subject: "",
    description: "",
    screenshot: null,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === "screenshot" && e.target instanceof HTMLInputElement && e.target.files) {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("subject", formData.subject);
    formDataToSubmit.append("description", formData.description);
    if (formData.screenshot) {
      formDataToSubmit.append("screenshot", formData.screenshot);
    }
    formDataToSubmit.append("feedback_type", formData.feedback_type);

    axios
      .post("/bugs", formDataToSubmit)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bug Report</h2>}
    >
      <Head title="Bug Report" />

      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <main className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Bug Report Form</h1>
            <div className="bg-white shadow-sm rounded-lg p-6">
              {submitted ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Thank you for your submission!</h2>
                  <p className="text-gray-600">We will look into it shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <SelectInput
                    id="feedback_type"
                    name="feedback_type"
                    label="Feedback Type"
                    value={formData.feedback_type}
                    onChange={handleChange}
                    options={[
                      { value: "Bug", label: "Bug" },
                      { value: "Feature Request", label: "Feature Request" },
                      { value: "Other", label: "Other" },
                    ]}
                    required
                  />
                  <TextInput
                    id="subject"
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <TextArea
                    id="description"
                    name="description"
                    label="Describe the issue"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <FileInput
                    id="screenshot"
                    name="screenshot"
                    label="Screenshot"
                    onChange={handleChange}
                  />
                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}