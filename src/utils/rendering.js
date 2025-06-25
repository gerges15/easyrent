export function renderLink({
  label,
  path,
  icon,
  attrs = "",
  authOnly = false,
  isLogout = false,
}) {
  const classes = [
    "flex items-center gap-1 hover:text-indigo-500",
    isLogout ? "hover:text-red-500" : "",
  ].join(" ");

  const dataAttr = attrs ? attrs : "";
  const extraClass = authOnly ? "user-menu-item hidden" : "";

  const onClick = isLogout ? `onclick="handleLogout(); return false;"` : "";

  return `
    <li class="${extraClass}">
      <a href="${path}" ${dataAttr} class="${classes}" ${onClick}  data-link >
        ${icon} ${label}
      </a>
    </li>
  `;
}
