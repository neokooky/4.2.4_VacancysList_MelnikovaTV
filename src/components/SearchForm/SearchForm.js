import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
export const SearchForm = ({ searchValue, setSearchValue, onSearch, }) => {
    return (_jsxs(Group, { align: "flex-end", children: [_jsx(TextInput, { w: 403, styles: { input: { height: 40 } }, placeholder: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C \u0438\u043B\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", leftSection: _jsx(IconSearch, { size: 16 }), value: searchValue, onChange: (e) => setSearchValue(e.currentTarget.value), onKeyDown: (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        onSearch();
                    }
                } }), _jsx(Button, { variant: "filled", color: "#4263eb", h: 40, onClick: onSearch, children: "\u041D\u0430\u0439\u0442\u0438" })] }));
};
