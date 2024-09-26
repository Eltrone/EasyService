-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL, -- admin | provider | normal
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Countries table
CREATE TABLE IF NOT EXISTS `countries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Product Types table
CREATE TABLE IF NOT EXISTS `product_types` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Activities table
CREATE TABLE IF NOT EXISTS `activities` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Providers table
CREATE TABLE IF NOT EXISTS `providers` (
  `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT(11) NULL UNIQUE,
  `company_name` VARCHAR(255),
  `logo` VARCHAR(255),
  `address` VARCHAR(255),
  `phone_number` VARCHAR(255),
  `email` VARCHAR(255),
  `description` VARCHAR(255),
  `website` VARCHAR(255),
  `status` INT(1) DEFAULT 0,
  `contact_first_name` VARCHAR(255) NULL, -- Added for contact first name
  `contact_last_name` VARCHAR(255) NULL, -- Added for contact last name
  `contact_position` VARCHAR(255) NULL, -- Added for contact position
  `contact_phone_number` VARCHAR(255) NULL, -- Added for contact phone number
  `contact_email` VARCHAR(255) NULL, -- Added for contact email
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `start` VARCHAR(255),
  `end` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Junction table for Provider and Country (Many-to-Many)
CREATE TABLE IF NOT EXISTS `provider_countries` (
  `provider_id` INT,
  `country_id` INT,
  PRIMARY KEY (`provider_id`, `country_id`),
  FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE
);

-- Junction table for Provider and Product Type (Many-to-Many)
CREATE TABLE IF NOT EXISTS `provider_product_types` (
  `provider_id` INT,
  `product_type_id` INT,
  PRIMARY KEY (`provider_id`, `product_type_id`),
  FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_type_id`) REFERENCES `product_types`(`id`) ON DELETE CASCADE
);

-- Junction table for Provider and Activity (Many-to-Many)
CREATE TABLE IF NOT EXISTS `provider_activities` (
  `provider_id` INT,
  `activity_id` INT,
  PRIMARY KEY (`provider_id`, `activity_id`),
  FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE CASCADE
);

-- Junction table for Provider and Service (Many-to-Many)
CREATE TABLE IF NOT EXISTS `provider_services` (
  `provider_id` INT,
  `service_id` INT,
  PRIMARY KEY (`provider_id`, `service_id`),
  FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `isServiceProvider` ENUM('yes', 'no') NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `company` VARCHAR(100) NOT NULL,
  `postalCode` VARCHAR(20) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `destinationCountry` VARCHAR(50),
  `destinationPostalCode` VARCHAR(20),
  `destinationCity` VARCHAR(50),
  `message` TEXT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert an admin user
INSERT INTO
  `users` (
    `username`,
    `email`,
    `password`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    'admin',
    'admin@easy-service.com',
    'hashed_password_here',
    'admin',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

-- Insert into Product Types
INSERT INTO
  `product_types` (`name`, `created_at`, `updated_at`)
VALUES
  ('Service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Product', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert into Activities (Activity Domains)
INSERT INTO
  `activities` (`name`, `created_at`, `updated_at`)
VALUES
  (
    'Food & Beverage',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Dietary Supplements',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Feed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Medical Devices',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Cosmetics',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

-- Insert into Services (Services Provided)
INSERT INTO
  `services` (`name`, `created_at`, `updated_at`)
VALUES
  (
    'Regulation',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Science', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Quality/Security',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('R&D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Sales', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Transport',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

-- Insert into Countries (All Countries)
INSERT INTO
  `countries` (`name`, `created_at`, `updated_at`)
VALUES
  (
    'Afghanistan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Albania', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Algeria', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Andorra', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Angola', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Antigua and Barbuda',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Argentina',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Armenia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Australia',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Austria', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Azerbaijan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Bahamas', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Bahrain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Bangladesh',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Barbados', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Belarus', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Belgium', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Belize', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Benin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Bhutan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Bolivia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Bosnia and Herzegovina',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Botswana', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Brazil', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Brunei', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Bulgaria', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Burkina Faso',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Burundi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Cabo Verde',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Cambodia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Cameroon', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Canada', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Central African Republic',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Chad', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Chile', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('China', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Colombia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Comoros', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Congo (Congo-Brazzaville)',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Congo (DRC)',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Costa Rica',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Croatia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Cuba', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Cyprus', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Czech Republic',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Denmark', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Djibouti', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Dominica', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Dominican Republic',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Ecuador', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Egypt', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'El Salvador',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Equatorial Guinea',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Eritrea', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Estonia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Eswatini (fmr. "Swaziland")',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Ethiopia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Fiji', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Finland', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('France', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Gabon', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Gambia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Georgia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Germany', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ghana', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Greece', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Grenada', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Guatemala',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Guinea', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Guinea-Bissau',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Guyana', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Haiti', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Honduras', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Hungary', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Iceland', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('India', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Indonesia',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Iran', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Iraq', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ireland', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Israel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Italy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Jamaica', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Japan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Jordan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Kazakhstan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Kenya', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Kiribati', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Korea (North)',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Korea (South)',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Kuwait', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Kyrgyzstan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Laos', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Latvia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Lebanon', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Lesotho', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Liberia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Libya', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Liechtenstein',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Lithuania',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Luxembourg',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Madagascar',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Malawi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Malaysia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Maldives', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Mali', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Malta', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Marshall Islands',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Mauritania',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Mauritius',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Mexico', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Micronesia',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Moldova', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Monaco', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Mongolia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Montenegro',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Morocco', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Mozambique',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Myanmar (formerly Burma)',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Namibia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Nauru', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Nepal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Netherlands',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'New Zealand',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Nicaragua',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Niger', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Nigeria', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'North Macedonia',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Norway', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Oman', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Pakistan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Palau', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Panama', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Papua New Guinea',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Paraguay', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Peru', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Philippines',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Poland', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Portugal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Qatar', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Romania', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Russia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Rwanda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Saint Kitts and Nevis',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Saint Lucia',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Saint Vincent and the Grenadines',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Samoa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'San Marino',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Sao Tome and Principe',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Saudi Arabia',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Senegal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Serbia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Seychelles',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Sierra Leone',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Singapore',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Slovakia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Slovenia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Solomon Islands',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Somalia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'South Africa',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'South Sudan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Spain', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Sri Lanka',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Sudan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Suriname', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Sweden', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Switzerland',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Syria', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Taiwan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Tajikistan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Tanzania', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Thailand', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Timor-Leste',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Togo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Tonga', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Trinidad and Tobago',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Tunisia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Turkey', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Turkmenistan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Tuvalu', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Uganda', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Ukraine', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'United Arab Emirates',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'United Kingdom',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'United States',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Uruguay', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Uzbekistan',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Vanuatu', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (
    'Vatican City',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Venezuela',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  ('Vietnam', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Yemen', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Zambia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Zimbabwe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Example Providers
INSERT INTO
  `providers` (
    `user_id`,
    `company_name`,
    `logo`,
    `address`,
    `phone_number`,
    `email`,
    `description`,
    `website`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'Global Health Services',
    'logo1.png',
    '123 Health St, City, Country',
    '+1234567890',
    'contact@ghs.com',
    'Providing comprehensive health services globally.',
    'http://ghs.com',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Eco Products Inc.',
    'logo2.png',
    '456 Green Ave, City, Country',
    '+1234567891',
    'info@ecoproducts.com',
    'Sustainable eco-friendly products for everyday use.',
    'http://ecoproducts.com',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'Tech Innovations',
    'logo3.png',
    '789 Tech Park, City, Country',
    '+1234567892',
    'support@techinnovations.com',
    'Leading the way in technology innovations.',
    'http://techinnovations.com',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

-- Insert into junction tables for the providers
-- Provider Countries (Assuming you know the provider IDs)
INSERT INTO
  `provider_countries` (`provider_id`, `country_id`)
VALUES
  (1, 1),
  -- Global Health Services, Afghanistan
  (1, 2),
  -- Global Health Services, Albania
  (2, 2),
  -- Eco Products Inc., Albania
  (3, 3);

-- Tech Innovations, Algeria
-- Provider Product Types
INSERT INTO
  `provider_product_types` (`provider_id`, `product_type_id`)
VALUES
  (1, 1),
  -- Global Health Services, Service
  (2, 2),
  -- Eco Products Inc., Product
  (3, 1);

-- Tech Innovations, Service
-- Provider Activities
INSERT INTO
  `provider_activities` (`provider_id`, `activity_id`)
VALUES
  (1, 1),
  -- Global Health Services, Food & Beverage
  (2, 2),
  -- Eco Products Inc., Dietary Supplements
  (3, 1);

-- Tech Innovations, Food & Beverage
-- Provider Services
INSERT INTO
  `provider_services` (`provider_id`, `service_id`)
VALUES
  (1, 1),
  -- Global Health Services, Regulation
  (2, 2),
  -- Eco Products Inc., Science
  (3, 1);

-- Tech Innovations, Regulation