import React, { useState } from 'react';
import { fetchMeta } from '../api';
import LinkPreviewCard from './LinkPreviewCard';

const LinkPreviewer = () => {
    const [link, setLink] = useState(null);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const findMeta = async () => {
        if (!link) {
            return;
        }

        try {
            setError(() => null);
            setLoading(() => true);
            setMeta(() => null);
            const response = await fetchMeta(link);
            setMeta(() => response.data);
        } catch (err) {
            console.error(err);
            setError(() => 'Meta is not available, Try again later 🤓');
        } finally {
            setLoading(() => false);
        }
    };

    const handleTextChange = (e) => {
        setLink(() => e.target.value);
    };

    return (
        <div className="container mx-auto px-4">
            <header className="mt-32">
                <h1 className="font-bold text-4xl text-center">
                    Not just a link, there is more to it
                </h1>
                <h2 className="text-2xl text-center mt-4">
                    You can paste any link, we will find <br /> the meta data
                    for that link
                </h2>
            </header>
            <div className="gap-8 mt-32 grid grid-cols-1 xl:grid-cols-2">
                <div className="bg-white p-6">
                    <label className="font-bold text-md" htmlFor="linkInput">
                        Input your link
                    </label>
                    <div className="mt-4 flex items-end flex-col">
                        <textarea
                            data-testid="linkInput"
                            onChange={handleTextChange}
                            className="w-full resize-none p-4 focus:outline-primary"
                            type="text"
                            id="linkInput"
                            rows={3}
                        />
                        <button
                            data-testid="readyBtn"
                            onClick={findMeta}
                            className="bg-primary py-2 px-8 rounded-md text-white font-bold mt-4 hover:contrast-200">
                            Ready
                        </button>
                    </div>
                </div>
                <LinkPreviewCard
                    meta={meta}
                    loading={loading}
                    link={link}
                    error={error}
                />
            </div>
        </div>
    );
};

export default LinkPreviewer;
