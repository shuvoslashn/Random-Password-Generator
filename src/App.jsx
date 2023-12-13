import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const App = () => {
    const [length, setLength] = useState(8);
    const [numAllow, setNumAllow] = useState(false);
    const [charAllow, setCharAllow] = useState(false);
    const [password, setPassword] = useState(``);
    const [paste, setPaste] = useState(``);

    const passwordRef = useRef(null);

    // copy password to clipboard
    const copyPassToClip = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
        toast.success("Text copied successfully");
    }, [password]);

    // paste function
    const pastePassword = useCallback(
        async (e) => {
            e.preventDefault();
            const cliptext = await window.navigator.clipboard.readText();
            setPaste(cliptext);
            toast.success("Text pasted successfully");
        },
        [password]
    );

    // password generator function
    const passGenerator = useCallback(() => {
        let pass = ``;
        let str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
        const numberChars = `0123456789`;
        const specialChars = `!@#$%^&*()_+[]{}|;:,.<>?`;

        numAllow && (str += numberChars);
        charAllow && (str += specialChars);

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [length, numAllow, charAllow, setPassword]);

    //useEffect for invoke password generator function
    useEffect(() => {
        passGenerator();
    }, [length, numAllow, charAllow, passGenerator]);

    return (
        <main className='w-full min-h-screen flex justify-center items-center flex-col p-8'>
            <div className='mx-4 py-6 px-8 bg-white/5 flex flex-col gap-4 w-full max-w-xl'>
                <h4 className='text-center text-lg sm:text-2xl mb-2'>
                    Random Password Generator
                </h4>

                {/* input box & button */}
                <div className='flex'>
                    <input
                        type='text'
                        value={password}
                        placeholder='Password'
                        ref={passwordRef}
                        className='px-4 py-2 w-full bg-white/5  focus:outline-none'
                        readOnly
                    />
                    <button
                        onClick={copyPassToClip}
                        className='px-6 py-2 bg-teal-700 duration-300 hover:bg-teal-900 border border-teal-700 text-white'
                    >
                        Copy
                    </button>
                </div>

                {/* filtering options */}
                <div className='flex justify-between items-center flex-col sm:flex-row gap-2 mt-4'>
                    <div className='flex gap-2'>
                        <input
                            type='range'
                            min={6}
                            max={50}
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            className='cursor-pointer accent-teal-700 w-16'
                        />
                        <label className='w-24'>Length: {length}</label>
                    </div>
                    <div className='flex gap-2'>
                        <input
                            type='checkbox'
                            className='accent-teal-700'
                            defaultChecked={numAllow}
                            id='numInput'
                            onChange={(e) => setNumAllow((prev) => !prev)}
                        />
                        <label className='cursor-pointer' htmlFor='numInput'>
                            Numbers
                        </label>
                    </div>
                    <div className='flex gap-2'>
                        <input
                            type='checkbox'
                            className='accent-teal-700'
                            defaultChecked={charAllow}
                            id='charInput'
                            onChange={(e) => setCharAllow((prev) => !prev)}
                        />
                        <label className='cursor-pointer' htmlFor='charInput'>
                            Characters
                        </label>
                    </div>
                </div>
            </div>
            <div className='mt-8 mx-4 w-full max-w-xl relative'>
                <textarea
                    value={paste}
                    onChange={(e) => setPaste(e.target.value)}
                    className='bg-white/5 w-full min-h-[200px] px-6 py-4 placeholder:text-zinc-600 focus:outline-none'
                    placeholder='Check your password here'
                ></textarea>
                <div className='absolute bottom-6 left-4'>
                    <button
                        className='text-sm px-8 py-2 hover:text-black text-white duration-300 border bg-teal-700 border-teal-600 hover:bg-white '
                        onClick={pastePassword}
                    >
                        Paste
                    </button>
                    <button
                        className='ml-2 text-sm px-8 py-2 hover:text-white text-teal-600 duration-300 border border-teal-600 hover:bg-teal-700 '
                        onClick={() => setPaste("")}
                    >
                        Clear Text
                    </button>
                </div>
            </div>
        </main>
    );
};

export default App;
