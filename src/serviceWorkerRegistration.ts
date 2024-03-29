/* eslint-disable promise/always-return */
/* eslint-disable no-console */
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost'
  // [::1] is the IPv6 localhost address.
  || window.location.hostname === '[::1]'
  // 127.0.0.0/8 are considered localhost for IPv4.
  || /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(window.location.hostname),
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

function precacheReady(registration: ServiceWorkerRegistration, config?: Config) {
  // At this point, the updated precached content has been fetched,
  // but the previous service worker will still serve the older
  // content until all client tabs are closed.
  console.log(
    'New content is available and will be used when all '
    + 'tabs for this page are closed. See https://cra.link/PWA.',
  );

  // Execute callback
  if (config && config.onUpdate) {
    config.onUpdate(registration);
  }
}

function contentCachedForOfflineUse(registration: ServiceWorkerRegistration, config?: Config) {
  // At this point, everything has been precached.
  // It's the perfect time to display a
  // "Content is cached for offline use." message.
  console.log('Content is cached for offline use.');

  // Execute callback
  if (config && config.onSuccess) {
    config.onSuccess(registration);
  }
}

function installOnstateChangeFn(
  installingWorker: ServiceWorker,
  registration: ServiceWorkerRegistration,
  config?: Config,
) {
  return (() => {
    if (installingWorker.state !== 'installed') {
      return;
    }

    if (navigator.serviceWorker.controller) {
      precacheReady(registration, config);
    } else {
      contentCachedForOfflineUse(registration, config);
    }
  });
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // eslint-disable-next-line no-param-reassign
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) {
          return;
        }
        installingWorker.onstatechange = installOnstateChangeFn(
          installingWorker,
          registration,
          config,
        );
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

async function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  try {
    const response = await fetch(swUrl, { headers: { 'Service-Worker': 'script' } });

    // Ensure service worker exists, and that we really are getting a JS file.
    const contentType = response.headers.get('content-type');
    if (
      response.status === 404
      || (contentType && !contentType.includes('javascript'))
    ) {
      // No service worker found. Probably a different app. Reload the page.
      // eslint-disable-next-line promise/no-nesting
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }
  } catch (error) {
    console.log('No internet connection found. App is running in offline mode.:', error);
  }
}

function loadListener(config?: Config) {
  return () => {
    const swUrl = '/service-worker.js';

    if (isLocalhost) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      void checkValidServiceWorker(swUrl, config);

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      void navigator.serviceWorker.ready.then(() => {
        console.log(
          'This web app is being served cache-first by a service '
          + 'worker. To learn more, visit https://cra.link/PWA',
        );
      });
    } else {
      // Is not localhost. Just register service worker
      registerValidSW(swUrl, config);
    }
  };
}

export function register(config?: Config): void {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL('', window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', loadListener(config));
  }
}

export function unregister(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        void registration.unregister();
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.error(error.message);
      });
  }
}
