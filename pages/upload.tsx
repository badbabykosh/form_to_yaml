import React, { useState } from 'react';
import Papa from 'papaparse';
import YAML from 'yaml';

function Upload() {
    const [csvData, setCsvData] = useState<string[][]>([]);
    const [yamlOutput, setYamlOutput] = useState<string>('');

    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            complete: function (results: Papa.ParseResult<string[]>) {
                const data = results.data;
                setCsvData(data);

                const headers = data[0];
                const yamlEntries = data.slice(1).map((row: string[]) => {
                    const franchise: string = row[headers.indexOf('franchise')];
                    const list: string = row[headers.indexOf('list')];
                    const background: string = row[headers.indexOf('background')];
                    const poster: string = row[headers.indexOf('Poster')];
                    const summary: string = row[headers.indexOf('summary')];

                    return `
  ${franchise}:
    trakt_list: ${list}
    sync_mode: sync
    url_background: ${background}
    url_poster: ${poster}
    summary: ${summary}
    `;
                });

                setYamlOutput(`collections:\n${yamlEntries.join('\n')}`);
            },
        });
    }

    return (
        <div>
            <h1>Jamo CSV to YAML Converter</h1>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <pre>{yamlOutput}</pre>
        </div>
    );
}

export default Upload;
