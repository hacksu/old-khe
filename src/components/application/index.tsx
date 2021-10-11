

interface props {
    register?: boolean; // show account registration step
}

export default function Application(props: props) {
    return (
        <div>
            application
            { props.register ? 'register' : ''}
        </div>
    )
}