# AC Games Website

This is the official website for AC Games, an indie game development studio. It showcases our games, technologies used, and provides contact information.

## Project Structure

- `index.html`: The main landing page.
- `contact/index.html`: The contact page with a form.
- `privacy/index.html`: The privacy policy page.
- `terms/index.html`: The terms of service page.
- `flappy-vertical/index.html`: Dedicated page for the "Flappy Vertical" game.
- `slice-and-trap/index.html`: Dedicated page for the "Slice and Trap" game.
- `404.html`: Custom 404 error page.
- `assets/`: Contains images and other static assets.
- `i18n/`: Contains translation files for multiple languages (English, French, Dutch).
- `src/`: Contains modularized JavaScript code for various functionalities (theme, i18n, forms, UI).
- `style.css`: Main stylesheet using Tailwind CSS.
- `vite.config.js`: Vite configuration file for building the multi-page application.

## Technologies Used

- **Vite**: Fast frontend tooling for development and building.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **JavaScript (ES Modules)**: For interactive elements and logic.
- **EmailJS**: For handling contact form submissions without a backend.
- **Google reCAPTCHA v2**: For spam protection on the contact form.
- **Umami Analytics**: Privacy-friendly analytics for website traffic (optional, requires setup).

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ac-games365/ac-games365.github.io.git
    cd ac-games365.github.io
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start a local server, usually at `http://localhost:5173`.

### Building for Production

To create a production-ready build of your site:

```bash
npm run build
```

This command will compile your assets and generate optimized static files in the `dist/` directory.

### Publishing to GitHub Pages

This project is configured to be easily deployed to GitHub Pages using the `gh-pages` package.

1.  **Ensure your `vite.config.js` `base` property is set correctly.** For GitHub Pages, it should typically be `./` or your repository name if it's not a project page. (Currently set to `./`).
2.  **Deploy the site:**
    ```bash
    npm run deploy
    ```
    This command will first run `npm run build` and then push the contents of the `dist/` directory to the `gh-pages` branch of your repository.

## Contact Form Setup (EmailJS & reCAPTCHA)

The contact form uses EmailJS for sending emails and Google reCAPTCHA v2 for spam protection.

1.  **EmailJS Setup:**
    *   Go to [EmailJS](https://www.emailjs.com/) and create an account.
    *   Add a new **Email Service** (e.g., Gmail) and connect your `contact.acgames@gmail.com` account. Ensure you grant permission to "Send email on your behalf".
    *   Create a new **Email Template** (e.g., named `template_contact_us`). Use the following HTML structure for your template:
        ```html
        <div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
          <div>A new message from the AC Games Contact Form has been received.</div>
          <div
            style="
              margin-top: 20px;
              padding: 15px 0;
              border-width: 1px 0;
              border-style: dashed;
              border-color: lightgrey;
            "
          >
            <table role="presentation">
              <tr>
                <td style="vertical-align: top">
                  <div
                    style="
                      padding: 6px 10px;
                      margin: 0 10px;
                      background-color: #22c55e;
                      color: white;
                      border-radius: 5px;
                      font-size: 26px;
                    "
                    role="img"
                  >
                    ✉️
                  </div>
                </td>
                <td style="vertical-align: top">
                  <div style="color: #2c3e50; font-size: 16px">
                    <strong>Name:</strong> {{name}}
                  </div>
                  <div style="color: #2c3e50; font-size: 16px; margin-top: 5px;">
                    <strong>Email:</strong> <a href="mailto:{{email}}">{{email}}</a>
                  </div>
                  <div style="color: #cccccc; font-size: 13px; margin-top: 5px;">Date: {{time}}</div>
                  
                  <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                    <p style="font-size: 16px; white-space: pre-wrap;">{{message}}</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        ```
    *   In the **Settings** tab of your Email Template, set `Reply To` to `{{email}}`.
    *   Find your **EmailJS Public Key** in the "Account" section.
    *   Update `contact/index.html` with your EmailJS Public Key:
        ```javascript
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual Public Key
        ```
    *   Update `src/form.js` with your EmailJS Service ID and Template ID:
        ```javascript
        const serviceID = 'service_4q2a8zg'; // Your EmailJS Service ID
        const templateID = 'template_contact_us'; // Your EmailJS Template ID
        ```

2.  **Google reCAPTCHA v2 Setup:**
    *   Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin) and register a new site.
    *   Choose **reCAPTCHA v2** -> "I'm not a robot" Checkbox.
    *   Add your domain (`ac-games365.github.io`) and `localhost` for testing.
    *   You will receive a **Site Key** and a **Secret Key**.
    *   Update `contact/index.html` with your reCAPTCHA Site Key:
        ```html
        <div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div> <!-- Replace with your actual Site Key -->
        ```
    *   In EmailJS, go to the **reCAPTCHA** tab and add your **Secret Key**.

## Analytics Setup (Umami)

The website is configured to use Umami for privacy-friendly analytics.

1.  **Umami Setup:**
    *   Go to [Umami](https://umami.is/) and create a free account (Hobby plan).
    *   Add your website (`ac-games365.github.io`).
    *   Umami will provide you with a tracking code snippet, including a `data-website-id`.
    *   The `index.html` file is already updated with the Umami script and your provided `data-website-id`.

## License

[Specify your project's license here, e.g., MIT, Apache 2.0, etc.]
