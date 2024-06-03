# Releasing

This document provides steps to releasing new Slick Transaction versions.

The steps come in two parts:

__Release__

These steps include tasks to release a new version.

__Post Release__

These steps include tasks that need to be performed after a release has succeeded or failed.

## Steps

### Release

1. Go to the [Releases](https://github.com/smartweaver/slick-transaction/releases) page.

1. Create a new release using the "Draft new release" button.

1. Type in a release title using the following format: `YYYY-MM-DD / vX.X.X`.

    <img width="600" alt="Screenshot 2024-06-03 at 09 52 40" src="https://github.com/smartweaver/slick-transaction/assets/12766301/934e465c-5598-46e5-86df-b16986a02151">


1. Select the branch for the version you are releasing using the "Target" dropdown. For example, if you are releasing a `v0.x` version, then select the `v0.x` branch.

    <img width="600" alt="Screenshot 2024-06-03 at 09 52 40 2" src="https://github.com/smartweaver/slick-transaction/assets/12766301/40b2eb2f-fc44-43b7-a6a4-519a687fc6f4">

1. Verify the versions in the branch's `package.json` file. If the versions are incorrect, then update them and push the changes to the version branch you are targeting (e.g., `v0.x`).

    - Verify the version you are releasing. For example, if you are releasing `v0.0.10`, then verify the `package.json#version` field is `v0.0.10`:

        ```text
        {
          "name": "@smartweaver/slick-transaction",
          "version": "0.0.10",
        
          // ... rest of package.json file
        }
       ```

    - Verify the build version is the current US Eastern date and time. The build version format is `YYYYMMDD.HHMM` and `HHMM` is in 24-hour time format. For example, if the current US Eastern date and time is 2024-01-01 1:00pm, then verify the `package.json#versionBuild` field is `20240101.1300`:
  
        ```text
        {
          "name": "@smartweaver/slick-transaction",
          "version": "0.0.10",
          "versionBuild": "20240101.1300",
        
          // ... rest of package.json file
        }
        ```

1. Create a tag that matches the version you are releasing (e.g., `v0.0.10`) using the "Choose a tag" dropdown.

    You will be creating a new tag using the __Create new tag__ button when it appears:

    <img width="600" alt="Screenshot 2024-06-03 at 09 52 03" src="https://github.com/smartweaver/slick-transaction/assets/12766301/8790295d-d615-48e9-9937-d1a08bb31054">

1. (Optional) Add some release notes. You can add these after the version has been published. Reason being the CI might not publish on the first try because of validation errors. If this happens, it would be cumbersome to copy and paste the release notes when recreating the release.

1. Make sure __Set as the latest release__ checkbox is checked.

    <img width="600" alt="Screenshot 2024-06-03 at 10 03 48" src="https://github.com/smartweaver/slick-transaction/assets/12766301/4e0c17f1-e68c-42a9-a170-2c060c1a63c4">

1. Publish the release by using the __Publish release__ button.

    > Note
    >
    > This will trigger the CI to publish a new version. You can monitor the CI on the [Actions](https://github.com/smartweaver/slick-transaction/actions) page.

### Post Release

#### Release successful? Follow these steps.

1. Make sure the release has made it to the package registries:

    - https://www.npmjs.com/package/@smartweaver/slick-transaction

#### Release failed? Follow these steps.

1. Check the logs in the CI to find out more details on why it failed.

1. Fix the issues.

1. Delete the release you created on the [Releases](https://github.com/smartweaver/slick-transaction/releases) page.

    <img width="600" alt="Screenshot 2024-06-03 at 10 10 38" src="https://github.com/smartweaver/slick-transaction/assets/12766301/d3117b95-c344-41f3-807b-db83a9b1c8e6">

1. Delete the tag that was created for the release on the [Tags](https://github.com/smartweaver/slick-transaction/tags) page.

   <img width="600" alt="Screenshot 2024-06-03 at 10 11 34" src="https://github.com/smartweaver/slick-transaction/assets/12766301/a7494ac3-627d-4bbb-acda-218f19597f17">

1. Repeat the [Release](#Release) steps.
