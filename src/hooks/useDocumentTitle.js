const { useRef, useEffect } = require("react");

function useDocumentTitle(title) {
    const defaultTitle = useRef(document.title);
    useEffect(() => {
        document.title = title + " | " + defaultTitle.current;
    }, [title]);
}

export default useDocumentTitle;