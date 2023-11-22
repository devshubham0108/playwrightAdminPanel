import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TerminalCodeBlock = () => {
  const codeString = "Random Phone Number 6922100457\nStatic Phone Number 9767417427\nRandom First Name cxiiTdrZWniFRWgYNrDO\nRandom Last Name TmidGENtZNYgrIoNEBEv\nRandom Email rF2IXC@example.com\n\nRunning 1 test using 1 worker\n\n[1A[2KRandom Phone Number 5581954438\n\n[1A[2KStatic Phone Number 9767417427\n\n[1A[2KRandom First Name vUKewiJnXN\n\n[1A[2KRandom Last Name zGcNCDrcPXhMCnvsLAo\n\n[1A[2KRandom Email 3Ggzdkn@example.com\n\n[1A[2K[1/1] [chromium] › test/SignUp-Test/SignUpFeatures.spec.ts:88:5 › Signup-Form-Validation-Error-Messeges\n[1A[2K  1 passed (6.2s)\n\nTo open last HTML report run:\n\n  npx playwright show-report";

  return (
    <div className="bg-gray-600 p-4 rounded-lg">
      <SyntaxHighlighter language="TerminalCodeBlock" style={vscDarkPlus}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default TerminalCodeBlock;
