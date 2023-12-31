// /* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient();

const CombineProviders = (providers) =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) => {
      const WrappedProvider = ({ children }) => (
        <AccumulatedProviders>
          <Provider {...props}>
            <>{children}</>
          </Provider>
        </AccumulatedProviders>
      );
      WrappedProvider.displayName = `CombineProviders(${
        Provider.displayName || Provider.name || 'Unknown'
      })`;

      return WrappedProvider;
    },
    ({ children }) => <>{children}</>
  );

export const AllProviders = CombineProviders([
  [QueryClientProvider, { client: queryClient }],
  [NotificationContextProvider],
  [UserContextProvider],
]);
