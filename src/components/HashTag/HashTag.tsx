
interface HashTagProps {
    text: string;
}

const HashTag = ({text}: HashTagProps) => {
    return <span>#{text}</span>
};

export default HashTag;