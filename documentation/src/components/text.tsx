import React, { PropsWithChildren } from 'react';

type Props = {
    title: string,
    color?: string
    width?: string
}


export default function Text(props: PropsWithChildren<Props>) {
    return (
        <>
            <div style={{ width: (props.width ?? '60vh'), color: props.color ?? 'white' }}>
                <h2>{props.title}</h2>
                {props.children}
            </div>
            <br />
        </>
    )
}