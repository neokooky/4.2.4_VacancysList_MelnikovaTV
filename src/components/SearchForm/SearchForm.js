import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
// import type { RootState } from "../../store/store";
import { setSearchValue, setPage } from "../../store/vacanciesSlice";
import { useRef } from "react";
// type SearchFormProps = {
//   setIsSearchTriggered: (trigger: boolean) => void;
// };
export const SearchForm = () => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const onSearch = (value) => {
        dispatch(setSearchValue(value));
        dispatch(setPage(1));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputRef.current?.value);
    };
    return (_jsxs(Group, { component: "form", onSubmit: handleSubmit, align: "flex-end", children: [_jsx(TextInput, { ref: inputRef, w: 403, styles: { input: { height: 40 } }, placeholder: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C \u0438\u043B\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", leftSection: _jsx(IconSearch, { size: 16 }) }), _jsx(Button, { variant: "filled", color: "#4263eb", h: 40, onClick: () => {
                    onSearch(inputRef.current?.value);
                }, children: "\u041D\u0430\u0439\u0442\u0438" })] }));
};
