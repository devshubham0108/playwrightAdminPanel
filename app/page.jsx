"use client";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Page() {
  const [devUrl, setDevUrl] = useState("");
  const [testName, setTestname] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const handelUrlChange = function (e) {
  //   setDevUrl(e.target.value);
  // };
  const handleTestNameChange = function (e) {
    setTestname(e.target.value);
  };

  const testOptions = [
    "Signup-Form-Validation-Error-Messeges",
    "ChangePhoneNumber",
    "SignupForm",
    "Test 4",
  ];

  const handelTestNameChange = function (e) {
    setTestname(e.target.value);
  };

  const handleDevUrlChange = function (e) {
    setDevUrl(e.target.value);
  };

  // Select options for dev servers
  const devServers = [
    { value: "https://uitest.mymedisage.com", label: "UITest" },
    { value: "https://dev1.mymedisage.com", label: "Dev1" },
    { value: "https://dev2.mymedisage.com", label: "Dev2" },
    { value: "https://dev3.mymedisage.com", label: "Dev3" },
    { value: "https://dev4.mymedisage.com", label: "Dev4" },
    { value: "https://dev5.mymedisage.com", label: "Dev5" },
    { value: "https://dev6.mymedisage.com", label: "Dev6" },
    { value: "https://dev7.mymedisage.com", label: "Dev7" },
    { value: "https://dev8.mymedisage.com", label: "Dev8" },
    { value: "https://dev9.mymedisage.com", label: "Dev9" },
    { value: "https://dev10.mymedisage.com", label: "Dev10" },
    { value: "https://dev11.mymedisage.com", label: "Dev11" },
    { value: "https://dev12.mymedisage.com", label: "Dev12" },
    // Add more servers as needed
  ];

  useEffect(() => {
    // If responseData is updated, you can perform actions here
    // For example, console log the responseData
    console.log("Response Data:", responseData);
  }, [responseData]);

  const openUrlInNewTab = (e) => {
    e.sto;
    // Change 'your-url-here' to the URL you want to open in a new tab
    const url =
      "https://playwright-e2e-testing-bucket.s3.ap-south-1.amazonaws.com/index.html";
    window.open(url, "_blank");
  };

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading state to true
    e.preventDefault(); // Prevent default form submission

    const apiUrl = "http://localhost:7000/api/";

    // Create the request body using the state variables
    const requestBody = {
      devUrl: devUrl,
      testName: testName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json(); // Get response data
        // Handle success (e.g., show a success message)
        const extractedData = {
          commandOutput: responseData?.commandOutput?.commandOutput,
          reportLink: responseData?.commandOutput?.reportLink,
        };
        setResponseData(extractedData?.commandOutput); // Update th
        setLoading(false); // Set loading state to true
        console.log("API call successful");
      } else {
        setError(true);
        // Handle errors (e.g., show an error message)
        console.error("API call failed");
      }
    } catch (error) {
      setError(true);
      console.error("Error occurred:", error);
    }
  };

  console.log(devUrl, testName);

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Testing Dashboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label htmlFor="devurl" className="block mb-1">
            Enter Dev Server:
          </label>
          <input
            onChange={handelUrlChange}
            name="devurl"
            type="url"
            placeholder="https://dev2.mymedisage.com"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div> */}
        <div>
          <label htmlFor="devurl" className="block mb-1">
            Select Dev Server:
          </label>
          <select
            onChange={handleDevUrlChange}
            value={devUrl}
            name="devurl"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a server</option>
            {devServers.map((server, index) => (
              <option key={index} value={server.value}>
                {server.label}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label htmlFor="test" className="block mb-1">
            Enter Test Name:
          </label>
          <input
            onChange={handelTestNameChange}
            name="test"
            placeholder="Eg: SignUp test"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div> */}

        <div>
          <label htmlFor="test" className="block mb-1">
            Select Test Name:
          </label>
          {/* Select dropdown for test names */}
          <select
            onChange={handleTestNameChange}
            value={testName}
            name="test"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a test</option>
            {testOptions.map((test, index) => (
              <option key={index} value={test}>
                {test}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Submit Test
        </button>

        {responseData && (
          <button
            type="button"
            onClick={openUrlInNewTab}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Show Report
          </button>
        )}

        {devUrl && testName && (
          <div className="mt-2">
            <SyntaxHighlighter language="text" style={vscDarkPlus}>
              {`TEST_URL=${devUrl} npx playwright test ${testName}`}
            </SyntaxHighlighter>
          </div>
        )}
        {/* {<div className="bg-gray-800 text-gray-300 text-sm rounded-md p-2"></div>} */}
      </form>
      {loading && (
        <div className="text-center bg-yellow-200 p-4 rounded-md pt-2">
          Test is running in background please wait...
        </div>
      )}
      {error && (
        <div className="text-center bg-red-200 p-4 rounded-md">
          Oops... Something went wrong with the test..!
        </div>
      )}
      {responseData && (
        <>
          <div className="bg-zinc-900 p-2 rounded-lg mt-2">
            <SyntaxHighlighter language="TerminalCodeBlock" style={vscDarkPlus}>
              {responseData}
            </SyntaxHighlighter>
          </div>
        </>
      )}
    </div>
  );
}
