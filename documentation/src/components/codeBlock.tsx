import react, { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

type Props = {
    code: string,
    language: string,
    width?: string
}

export default function CodeBlock(props: PropsWithChildren<Props>) {
    useEffect(() => {
        Prism.highlightAll()
    }, [])

    return (
        <div className="Code">
            <pre style={{ width: props.width ?? '60vh', borderRadius: 20, fontVariantLigatures: 'common-ligatures' }}>
                <code className={`language-${props.language}`}>{props.code}</code>
            </pre>
        </div>
    )
}