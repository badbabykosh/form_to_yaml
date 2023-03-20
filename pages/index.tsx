import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useState } from 'react';

interface FormData {
    franchise: string;
    list: string;
    background: string;
    poster: string;
    summary: string;
}

export default function Home() {
    const [formData, setFormData] = useState<FormData>({
        franchise: '',
        list: '',
        background: '',
        poster: '',
        summary: '',
    });

    const [collectionsYaml, setCollectionsYaml] = useState('collections:\n');

    const [yamlOutput, setYamlOutput] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { franchise, list, background, poster, summary } = formData;

        const newYaml = `
  ${franchise}:
    trakt_list: ${list}
    sync_mode: sync
    url_background: ${background}
    url_poster: ${poster}
    summary: ${summary}
`;
        console.log(yamlOutput)
        console.log(newYaml)

        setYamlOutput((yamlOutput) => yamlOutput + newYaml);

        setFormData({
            franchise: '',
            list: '',
            background: '',
            poster: '',
            summary: '',
        });

    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className={styles.flex_center}>
            <div className="">
                <pre>{collectionsYaml + yamlOutput}</pre>
            </div>
            <div className="">
                <form className={styles.main} onSubmit={handleSubmit}>
                    <label>
                        Franchise:
                        <input type="text" name="franchise" value={formData.franchise} onChange={handleChange} />
                    </label>
                    <label>
                        List URL:
                        <input type="url" name="list" value={formData.list} onChange={handleChange} />
                    </label>
                    <label>
                        Background URL:
                        <input type="url" name="background" value={formData.background} onChange={handleChange} />
                    </label>
                    <label>
                        Poster URL:
                        <input type="url" name="poster" value={formData.poster} onChange={handleChange} />
                    </label>
                    <label>
                        Summary:
                        <textarea name="summary" value={formData.summary} onChange={handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
