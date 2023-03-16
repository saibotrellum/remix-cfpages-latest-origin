export default function Sidebar({ isNavToggled }: { isNavToggled: boolean }) {
  let classes = 'border-end bg-white';
  if (isNavToggled) classes += ' sb-sidenav-toggled';

  return (
    <div className={classes} id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
      <div className="list-group list-group-flush">
        <a className="list-group-item list-group-item-action list-group-item-light p-3" href="#">Dashboard</a>
        {' '}
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!"
        >
          Shortcut
        </a>
        {' '}
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!"
        >
          Overview
        </a>
        {' '}
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!"
        >
          Events
        </a>
        {' '}
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!"
        >
          Profile
        </a>
        {' '}
        <a
          className="list-group-item list-group-item-action list-group-item-light p-3"
          href="#!"
        >
          Status
        </a>
      </div>
    </div>
  );
}
