import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { useEffect, useState } from 'react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEchoPublic<{ count: number }>('counter', 'CounterUpdated', (event) => {
        console.log('CounterUpdated event received:', event);
        setCount(event.count);
    });

    useEffect(() => {
        fetch('/counter')
            .then((res) => res.json())
            .then((data) => setCount(data.count))
            .catch(console.error);
    }, []);

    const getCsrfToken = (): string => {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        return token ? decodeURIComponent(token) : '';
    };

    const handleIncrement = async () => {
        setLoading(true);
        try {
            await fetch('/counter/increment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'same-origin',
            });
        } catch (error) {
            console.error('Failed to increment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDecrement = async () => {
        setLoading(true);
        try {
            await fetch('/counter/decrement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'same-origin',
            });
        } catch (error) {
            console.error('Failed to decrement:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col items-center gap-6 lg:max-w-4xl">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleDecrement}
                                disabled={loading}
                                className="rounded-md bg-red-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                −
                            </button>
                            <div className="min-w-[120px] text-center">
                                <div className="text-4xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">
                                    {count}
                                </div>
                            </div>
                            <button
                                onClick={handleIncrement}
                                disabled={loading}
                                className="rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                +
                            </button>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
