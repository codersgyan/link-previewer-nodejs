import React from 'react';
import Error from './Error';
import Spinner from './Spinner';

const LinkPreviewCard = ({ meta, loading, link, error }) => {
    return (
        <div className="bg-white p-6">
            <div>
                <span className="font-bold text-md">Preview</span>
                <div className="mt-6 ">
                    <Spinner show={loading} />
                    <Error error={error} />

                    {meta && !loading && (
                        <div className="flex items-start gap-8">
                            <img
                                className="h-24"
                                src={meta.image}
                                alt={meta.title}
                            />
                            <div>
                                <a
                                    data-testid="linkTitle"
                                    className="text-xl font-bold hover:text-primary hover:underline"
                                    href={link}
                                    target="_blank">
                                    {meta.title}
                                </a>
                                <p
                                    data-testid="linkDescription"
                                    className="text-md mt-4 break-all">
                                    {meta.description}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LinkPreviewCard;
