import express from 'express';
import { updateUserProfile, getUserProfile } from '../../controllers/userprofile';
import verifyUserToken from '../../middlewares/usertokenverifcation';
import updateProfileInputsValidation from '../../middlewares/updateprofileinputsvalidation';

const router = express.Router();
/**
 * @swagger
 *
 * /api/v1/update-profile:
 *    patch:
 *      summary: update user profile end point
 *      description: This endpoint is used to update user profile.
 *      tags: [update user profile]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/updateProfile'
 *      responses:
 *        "200":
 *          description: user profile is successful updated
 *        "400":
 *          description: failed to update
 * components:
 *    schemas:
 *      updateProfile:
 *        type: object
 *        required:
 *          - first_name
 *          - last_name
 *          - username
 *          - occupation
 *          - address
 *          - language
 *          - profile_picture
 *        properties:
 *          first_name:
 *              type: string
 *          last_name:
 *              type: string
 *          passowrd:
 *              type: string
 *          username:
 *              type: string
 *          occupation:
 *              type: string
 *          address:
 *              type: string
 *          language:
 *              type: string
 *          profile_picture:
 *              type: string
 */

// ------------------ get user profile -----------
router.get('/:username', verifyUserToken, getUserProfile);

/**
 * @swagger
 *
 * /api/v1/{username}:
 *    get:
 *      summary: getting user profile end point
 *      description: This endpoint is used to retrieve user profile.
 *      tags: [get user profile]
 *      parameters:
 *        - in: path
 *          name: username
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: user profile is successful retrieved
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userProfile'
 *        "400":
 *          description: no user found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/notFound'
 * components:
 *    schemas:
 *      userProfile:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          Message:
 *            type: string
 *            description: Success message
 *        example:
 *          status: 200
 *          message: successful got user profile
 *      notFound:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          error:
 *            type: string
 *            description: The error message
 *        example:
 *          status: 400
 *          message: user not found
 */
// ------------------ update user profile --------
router.patch('/update-profile', verifyUserToken, updateProfileInputsValidation, updateUserProfile);

export default router;
