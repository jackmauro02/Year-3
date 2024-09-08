using UnityEngine;

public class Jackfps : MonoBehaviour
{
    public float movementSpeed = 5f;
    public float rotationSpeed = 3f;
    public float maxHealth = 100f;
    public float jumpForce = 1f;
    public Transform weaponSpawnPoint;
    public GameObject weaponPrefab;


    public LogicScript logic;

    private float currentHealth;
    public float damageVal = 20f;
    private bool isGrounded;

    private void Start()
    {
        currentHealth = maxHealth;
        //UpdateHealthHUD();
        logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<LogicScript>();
        //Jackfps = GameObject.FindGameObjectWithTag("Player").GetComponent<Jackfps>();
        // Instantiate the weapon at the spawn point
        InstantiateWeapon();
    }

    private void Update()
    {
        MovePlayer();

        if (Input.GetMouseButtonDown(0))
        {
            Shoot();
        }

        // Check for jump input
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            Jump();
        }

        if (Input.GetKeyDown(KeyCode.E))
        {
            TakeDamage(damageVal);
            Debug.Log("current health " + currentHealth);
        }

        if (Input.GetKeyDown(KeyCode.F))
        {
            Healing(damageVal);
            Debug.Log("current health " + currentHealth);
        }
    }

    private void MovePlayer()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        Vector3 movement = new Vector3(horizontal, 0f, vertical).normalized;
        Vector3 rotatedMovement = Quaternion.Euler(0, Camera.main.transform.eulerAngles.y, 0) * movement;

        transform.Translate(rotatedMovement * movementSpeed * Time.deltaTime, Space.World);

        // Rotate the player based on the camera's forward direction
        if (movement != Vector3.zero)
        {
            Quaternion toRotation = Quaternion.LookRotation(rotatedMovement, Vector3.up);
            transform.rotation = Quaternion.Slerp(transform.rotation, toRotation, rotationSpeed * Time.deltaTime);
        }
    }

    // Method to handle receiving damage
    public void TakeDamage(float damage)
    {
        currentHealth -= damage;
        // Update the HUD
        logic.removeHealth(damage);

        // Update the HUD
        //UpdateHealthHUD();

        // Check if the player is dead
        if (currentHealth <= 0)
        {
            Die();
        }
    }

    public void Healing(float heal)
    {

        //Update the HUD
        //UpdateHealthHUD();

        // Check if the player is dead
        if (currentHealth < maxHealth)
        {
            currentHealth += heal;
            // Update the HUD
            logic.addHealth(heal);
        }
    }

    private void Die()
    {
        // You can add death-related logic here, like playing death animation or ending the game
        Debug.Log("Player has died!");
    }

    private void Jump()
    {
        // Apply upward force for jumping
        GetComponent<Rigidbody>().AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        isGrounded = false;
    }

    private void OnCollisionEnter(Collision collision)
    {
        // Check if the player is grounded when colliding with a surface
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
        }
    }

    // Method to handle shooting
    private void Shoot()
    {
        // Instantiate and configure the weapon
        GameObject weapon = Instantiate(weaponPrefab, weaponSpawnPoint.position, weaponSpawnPoint.rotation);
        weapon.transform.SetParent(transform); // Set the player as the parent
    }

    // Instantiate the weapon at the spawn point
    private void InstantiateWeapon()
    {
        GameObject weapon = Instantiate(weaponPrefab, weaponSpawnPoint.position, weaponSpawnPoint.rotation);
        weapon.transform.SetParent(transform); // Set the player as the parent
    }

    public float GetHealthValue()
    {
        Debug.Log("current health " + currentHealth);
        return currentHealth;
    }
    public float startHealth()
    {
        Debug.Log("Start health: " + maxHealth);
        return maxHealth;
    }

}
