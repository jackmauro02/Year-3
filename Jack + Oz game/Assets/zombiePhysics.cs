using UnityEngine;

public class ZombieGravity : MonoBehaviour
{
    public float gravity = 10f; // Adjust the gravity force
    public LayerMask groundLayer; // Set this to the layer where your ground objects are placed

    private Rigidbody rb;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        if (rb == null)
        {
            Debug.LogError("Rigidbody component not found on the zombie!");
        }
    }

    private void FixedUpdate()
    {
        // Check if there's ground below the zombie
        if (!IsGrounded())
        {
            // Apply a constant downward force
            if (rb != null)
            {
                Vector3 downwardVector = Vector3.down * gravity;
                rb.AddForce(downwardVector);
            }
        }
    }

    private bool IsGrounded()
    {
        // Raycast downward to check if there's ground below
        float rayLength = 0.1f; // Adjust the ray length based on your scene
        RaycastHit hit;
        return Physics.Raycast(transform.position, Vector3.down, out hit, rayLength, groundLayer);
    }
}
