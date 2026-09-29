import type { PropsWithChildren } from 'react'; import { NavigationMenu } from '../../widgets/NavigationMenu/NavigationMenu'; import { TopMenu } from '../../widgets/TopMenu/TopMenu';
export function AppShell({ children }: PropsWithChildren) { return <div className="app"><NavigationMenu /><main><TopMenu /> <section className="content">{children}</section></main></div>; }
